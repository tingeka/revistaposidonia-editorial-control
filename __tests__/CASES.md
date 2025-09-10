# Test Cases

## Unit Tests

### Utils

**`getEmbedUrl`**
- [x] Returns embed URL for `youtube.com/watch?v=abc123`
- [x] Returns embed URL for `youtu.be/abc123` short links
- [x] Returns embed URL for `vimeo.com/123456` links
- [x] Returns null for unsupported host
- [x] Returns null for empty string
- [x] Returns null for malformed URL
- [x] Returns null for `youtube.com` without video id
- [x] Returns null for `youtu.be` without video id
- [x] Returns null for `vimeo.com` without video id

**`hasAudiovisualContent`**
- [x] Returns true if at least one field has non-empty value
- [x] Returns false if all fields are empty
- [x] Returns false for whitespace-only values

### Hooks

**`usePostWithEmbeds`**  
- [x] Returns `isLoading=true` while post data is being fetched  
- [x] Calls `useEntityRecords` with correct arguments (`postType`, `'post'`, `{ include: [id], _embed: true, per_page: 1 }`)  

## Integration Tests

### App

**`EditorialControlApp`**
- [x] Renders loading spinner initially, then tabs after `loadSettings` completes
- [x] Editing a field sets `hasUnsavedChanges=true`
- [x] Clicking save calls API, resets unsaved changes, shows success snackbar
- [x] Successful save resets unsaved changes
- [x] Disables save button when validation errors exist

### Modules

**`CoverAudiovisualModule`**
- [x] Shows correct video embed preview when a YouTube URL has additional query params 
- [x] Shows correct video embed preview when Vimeo URL has extra path segments 
- [x] Shows video embed preview when the URL has an uppercase hostname
- [x] Shows video embed preview when the URL has a trailing slash
- [x] Shows video embed preview with an empty title/description
- [x] Hides preview section for whitespace-only URL

**`CoverArticlesModule` + `ArticlePicker`**
- [x] Does not break store state when removing an article while another is loading 
- [x] selecting a fully embedded article renders complete preview
- [x] Selecting an article with missing `_embedded` data renders basic preview
- [x] Store update with null or empty API response fails gracefully
- [x] Switching between article types updates each preview independently
