#!/usr/bin/env python3
"""Generate a virtual try-on image by compositing closet item photos onto a reference photo.

Usage:
    python generate_tryon.py --reference reference.jpg \\
        --item top.jpg --item bottom.jpg \\
        --output tryon.png \\
        [--body-notes "large bust, narrow waist, slightly full calves"]

Requires GEMINI_API_KEY in the environment and the google-genai package
(pip install google-genai).
"""

import argparse
import os
import sys

from google import genai
from google.genai import types

MODEL = "gemini-2.5-flash-image"

PROMPT = (
    "Composite the clothing items shown in the following images onto the person "
    "in the reference photo, replacing what they are currently wearing. Preserve "
    "the person's identity, pose, body shape, and the background of the reference "
    "photo exactly. Render the garments with realistic fit and drape."
)

SUPPORTED_MIME_TYPES = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".heic": "image/heic",
    ".heif": "image/heif",
}


def load_image_part(path: str) -> types.Part:
    ext = os.path.splitext(path)[1].lower()
    mime_type = SUPPORTED_MIME_TYPES.get(ext)
    if mime_type is None:
        sys.exit(
            f"Unsupported image format for {path}: '{ext or '(no extension)'}'. "
            f"Supported formats: {', '.join(sorted(SUPPORTED_MIME_TYPES))}"
        )
    with open(path, "rb") as f:
        data = f.read()
    return types.Part.from_bytes(data=data, mime_type=mime_type)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--reference", required=True, help="Path to the reference photo of the person")
    parser.add_argument("--item", action="append", required=True, dest="items", help="Path to a closet item photo; repeat for multiple items")
    parser.add_argument("--output", required=True, help="Path to write the generated image")
    parser.add_argument("--body-notes", default="", help="Free-text body/fit notes to guide the composite")
    args = parser.parse_args()

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        sys.exit("GEMINI_API_KEY is not set")

    client = genai.Client(api_key=api_key)

    prompt = PROMPT
    if args.body_notes:
        prompt += f" Body shape notes to respect when fitting the garments: {args.body_notes}."

    contents = [prompt, load_image_part(args.reference)]
    contents.extend(load_image_part(item) for item in args.items)

    response = client.models.generate_content(model=MODEL, contents=contents)

    for part in response.candidates[0].content.parts:
        if part.inline_data is not None:
            with open(args.output, "wb") as f:
                f.write(part.inline_data.data)
            print(f"Wrote {args.output}")
            return

    sys.exit("No image was returned by the model")


if __name__ == "__main__":
    main()
