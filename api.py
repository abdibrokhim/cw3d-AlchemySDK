import openai

from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.organization = "org-GFdGk26ukVyy6uQEunGNarU2"
openai.api_key = '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'

# print(openai.Model.list())

def generate(prompt: str) -> str:
  response = openai.Image.create(
    prompt=prompt,
    n=1,
    size="256x256"
  )

  image_url = response['data'][0]['url']

  print('--------prompt---------')
  print(prompt)
  print('--------response---------')
  print(response)
  print('--------image_url---------')
  print(image_url)

  return image_url


@app.get("/")
def read_root():
    return {"text": "Hello World"}


@app.get("/api/dallee/{prompt}")
def read_item(prompt: str) -> str:
    return generate(prompt)
