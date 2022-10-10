1.  figure out youtube api
2.  figure out google auth
3.  create models
    - video model
      - original uploader from youtube api
      - time stamps relation
      - OG uploader's recommended timestamps
      - id same as youtube url
    - timestamps model
      - number of favourites
      - upvotes `number`
      - downvotes `number`
      - author `string`
      - associated video `videoId`
      - array of timestamps`[{ number , stringMax50chars }]`
      - recommended by video uploader `videoUploadedBy`
    - users model
      - timestamps relation `[timestampId]`
      - uploaded to youtube videos `[youtubeUploaderID]`
      - favorites timestamps `[timestampId]`
      - average rating across all submissions `?`
      - upvoted timestamps
      - downvoted timestamps
4.  create routes
5.  create ui
    1. landing page
    2. video page
    3. timestamp authoring page
