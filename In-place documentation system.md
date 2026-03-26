> I think it should be like drive.masaischool.com where we can store all of our product related documents.
> It should be accessible for internal use by authenticating with LMS and for products through UI.
> We should have sections like: articles, files(Videos, Images, PDFs, etc)

### Where all it is going to be used?
1. LMS
2. Assess

### What all functionality is needed?
1. Create an article
2. Create product
3. Support for GitHub like Markdown
4. Drag and drop: Videos, Images, PDFs

### How it should work

I want to create a system for maintaining component level documentation of any product. This is similar to how AWS shows docs for every portion of the UI.
Example(LMS):
Page heading: Lecture
It should have a info icon next to heading and when clicked it opens a sidebar with minimal info related to lectures.

Page heading: Lecture attendance
On clicking info icon it shows documentation related to Lecture attendance.

DB schema I am thinking is:
Product: name
Pages: Heading, Content(markdown), slug, placementKey, isPublished, version(number), product
I want to have a complete markdown editor which supports:
- GitHub style markdown
- Videos, images, links etc
- Side by side videos or images

Then I would like to create a standard react library which can be used by all of my products.
Behaviour of the library:
```jsx
<DocumentationProvider endpoint="https://myhosted-documentation.com/api" product="lms">
    <DocumentationIcon icon={<MaterialIcon name="docs"/>} placementKey="lecture-landing-page-header"/>
    <DocumentationDrawer/>
</DocumentationProvider>
```


