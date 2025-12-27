This project was created during the completion of the Web-development semester curriculum. It involved creating a summarization app using Next.js (+ Shadcn) for interface, FastAPI server and SQLite for database management. 

In summarization pipeline, [this model](https://huggingface.co/2KKLabs/Lacia_sum_small_v1) for transcribing an audio track retrieved from a video.

To launch Next.js dev server run
```
npm run dev
```

For FastAPI dev server, firstly create and enter a virtual environment, then install required dependenices
```
pip install yt-dlp moviepy ffmpeg transformers[sentencepiece] faster-whisper torch
```
To laucnh it inside venv (assuming you are inside the `nextjs-summarise-app/summarizator`) run
```
fastapi dev main.py
```
