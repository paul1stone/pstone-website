import anthropic
import os
key = os.environ.get("ANTHROPIC_API_KEY")
print(key)
client = anthropic.Anthropic()

message_batch = client.beta.messages.batches.create(
    requests=[
        {
            "custom_id": "first-prompt-in-my-batch",
            "params": {
                "model": "claude-3-5-haiku-20241022",
                "max_tokens": 100,
                "messages": [
                    {
                        "role": "user",
                        "content": "Hey Claude, tell me a short fun fact about video games!",
                    }
                ],
            },
        },
        {
            "custom_id": "second-prompt-in-my-batch",
            "params": {
                "model": "claude-3-7-sonnet-20250219",
                "max_tokens": 100,
                "messages": [
                    {
                        "role": "user",
                        "content": "Hey Claude, tell me a short fun fact about bees!",
                    }
                ],
            },
        },
    ]
)
print(message_batch)
