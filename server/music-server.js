import { WebApp } from 'meteor/webapp';
import { Meteor } from 'meteor/meteor';
import fs from 'fs';
import path from 'path';

const musicPath = path.resolve(process.cwd(), '../../../../../.music');

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ogg': 'audio/ogg',
    '.m4a': 'audio/mp4',
    '.flac': 'audio/flac',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.bmp': 'image/bmp'
  };
  return types[ext] || 'application/octet-stream';
}

function isAudioFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  // console.log(`Checking extension: "${ext}"`); // Debug line
  return ['.mp3', '.wav', '.ogg', '.m4a', '.flac'].includes(ext);
}

WebApp.connectHandlers.use('/static/music', (req, res, next) => {
  // console.log(`=== MUSIC ROUTE HIT: ${req.url} ===`); // Add this first

  const filePath = path.join(musicPath, req.url);

  if (!filePath.startsWith(musicPath)) {
    // console.log('Security check failed');

    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const contentType = getContentType(filePath);

    // Debug logging
    // console.log(`File: ${filePath}`);
    // console.log(`Extension: ${path.extname(filePath)}`);
    // console.log(`Is audio file: ${isAudioFile(filePath)}`);
    // console.log(`Content type: ${contentType}`);

    // For images, serve directly (faster)
    if (!isAudioFile(filePath)) {
      // console.log(`Serving image: ${filePath}`);
      const imageCacheLengthSeconds = 24 * 60 * 60; // 24 hours
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': contentType,
        'Cache-Control': `public, max-age=60` // TODO cache doesn't seem to work?
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // For audio files, handle range requests
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;

      const stream = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType
      });
      stream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});
