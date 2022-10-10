# User Stories

### MVP

1. Each page shares a an id with the youtube video
   - includes embedded youtube video
   - add timestamp button(if not logged in, will open login modal
2. each page has a list of contributed time stamps
   - time stamps can be up or down voted by logged in users
   - time stamp list include number of votes and percentage of upvotes
   - time stamp list includes contributors name
   - video owner will be able to flag timestamp as "recommended"
   - timestamps submitted by video owner will be flagged "by owner"
   - authors will be able to edit and delete their submissions
   - timestamps will not be allowed past the duration of the video
3. once timestamps are selected, the list is shown to one side of the video in desktop view, or below video in mobile view
   - timestamp format `12:34` - `'Timestamp label'` with the time being clickable
4. timestamp creation/editing
   - list of timestamp editing field with an 'add stamp' button ans 'submit
   - each stamp field has a field for time(with validation), stamp label(max length?) and delete button
   - when time field blurs, list items will be sorted by duration
5. login modal
   - login by google only, for yt integration

### PLANNED FEATURES

4. below timestamp list is a list of user submitted transcriptions
   - transcriptions can be upvoted
   - highest ranked transcriptions are at the top of the list
   - users will be able to delete/edit posts
5. once a transcript is selected, it switches to blog post view
   - blog view will contain the transcript.
   - blog format will be markdown
6. timestamp submission page
   -
