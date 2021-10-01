## Project Structure Philosophies

https://reactjs.org/docs/faq-structure.html

### Grouping by features or routes

common/
  Avatar.js
  Avatar.css
  APIUtils.js
  APIUtils.test.js
feed/
  index.js
  Feed.js
  Feed.css
  FeedStory.js
  FeedStory.test.js
  FeedAPI.js
profile/
  index.js
  Profile.js
  ProfileHeader.js
  ProfileHeader.css
  ProfileAPI.js


### Grouping by file type

  api/
    APIUtils.js
    APIUtils.test.js
    ProfileAPI.js
    UserAPI.js
  components/
    Avatar.js
    Avatar.css
    Feed.js
    Feed.css
    FeedStory.js
    FeedStory.test.js
    Profile.js
    ProfileHeader.js
    ProfileHeader.css
