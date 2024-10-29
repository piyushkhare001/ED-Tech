const removeHtmlTags = (htmlString) => {
    // Regular expression to remove HTML tags
    const regex = /<[^>]*>/g;
    // Replace HTML tags with an empty string
    return htmlString.replace(regex, ' ').trim();
  };
export default removeHtmlTags;