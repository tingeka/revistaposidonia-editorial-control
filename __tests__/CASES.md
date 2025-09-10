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
- [ ] Renders loading spinner initially, then tabs after `loadSettings` completes
- [ ] Editing a field sets `hasUnsavedChanges=true`
- [ ] Clicking save calls API, resets unsaved changes, shows success snackbar
- [ ] Validation errors prevent save and show error messages

### Modules

**`CoverAudiovisualModule`**
- [ ] YouTube URL with additional query params still shows correct video embed preview
- [ ] Vimeo URL with extra path segments shows correct video embed preview
- [ ] URL with uppercase hostname shows video embed preview
- [ ] URL with trailing slash shows video embed preview
- [ ] Empty title or description still shows video embed preview
- [ ] Whitespace-only URL hides preview section

**`CoverArticlesModule` + `ArticlePicker`**
- [x] Does not break store state when removing an article while another is loading 
- [x] selecting a fully embedded article renders complete preview
- [x] Selecting an article with missing `_embedded` data renders basic preview
- [x] Store update with null or empty API response fails gracefully
- [x] Switching between article types updates each preview independently
