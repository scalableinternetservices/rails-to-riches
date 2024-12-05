prefix = b"""\
------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n\
Content-Disposition: form-data; name="photo[image]"; filename="photo.webp"\r\n\
Content-Type: image/webp\r\n\r\n"""

suffix = b"""\
\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n\
Content-Disposition: form-data; name="photo[primary]"\r\n\r\n\
true\r\n\
------WebKitFormBoundary7MA4YWxkTrZu0gW--\r\n"""

with open("photo_form.bin", "wb") as f:
    f.write(prefix)
    with open("photo.webp", "rb") as p:
        f.write(p.read())
    f.write(suffix)