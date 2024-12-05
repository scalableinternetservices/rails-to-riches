prefix = b"""------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="photo[image]"; filename="photo.webp"
Content-Type: image/webp

"""

suffix=b"""
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="photo[primary]"

true
------WebKitFormBoundary7MA4YWxkTrZu0gW--"""

with open("photo_form.bin", "wb") as f:
    f.write(prefix)
    with open("photo.webp", "rb") as p:
        f.write(p.read())
    f.write(suffix)