from transformers import pipeline

classifier = pipeline("automatic-speech-recognition")

result = classifier("3.flac")

print(result)