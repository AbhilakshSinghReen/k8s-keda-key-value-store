from os import environ
from time import sleep

from huey import RedisHuey

from .redis_client import redis_client


redis_host = environ["REDIS_HOST"]
task_delay = float(environ.get("TASK_DELAY", 0))

huey = RedisHuey('entrypoint', host=redis_host)


@huey.task()
def set_key_value_pair(key: str, value: str):
    redis_client.set(key, value)
    sleep(task_delay)
    

@huey.task()
def delete_key_value_pair(key: str):
    redis_client.delete(key)
    sleep(task_delay)
