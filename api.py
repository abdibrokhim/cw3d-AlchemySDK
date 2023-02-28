import openai

from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import dotenv
import os

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

dotenv.load_dotenv()

openai.organization = os.getenv('organization')
openai.api_key = os.getenv('api_key')

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
