BASE="./public/assets/images"
FILES="$BASE/*.jpg"

for f in $FILES
do
	echo "Processing $f"
	filename=$(basename -- "$f")
	extension="${filename##*.}"
	filename="${filename%.*}"

	# cwebp -q 80 "$f" -o "$BASE/$filename-small.webp"
	convert "$f" -resize 400 -quality 80 "$BASE/thumbnails/$filename-small.jpg"
done
