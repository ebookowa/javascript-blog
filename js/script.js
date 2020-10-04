'use strict';

{
    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;

        /* [DONE] remove class 'active' from all article links  */

        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */


        clickedElement.classList.add('active');

        /* [DONE] remove class 'active' from all articles */

        const activeArticles = document.querySelectorAll('.posts .post.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */

        const articleSelector = clickedElement.getAttribute('href');


        /* [DONE] find the correct article using the selector (value of 'href' attribute) */

        const targetArticle = document.querySelector(articleSelector);


        /* [DONE] add class 'active' to the correct article */

        targetArticle.classList.add('active');
    };

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorSelector = '.post-author',
        optCloudClassCount = 5,
        optCloudClassPrefix = 'tag-size-';


    function generateTitleLinks(customSelector = '') {

        /* remove contents of titleList */

        const titleList = document.querySelector(optTitleListSelector);

        titleList.innerHTML = '';


        /* find all the articles and save them to variable: articles */

        const articles = document.querySelectorAll(optArticleSelector + customSelector);

        let html = '';

        for (let article of articles) {

            /* get the article id */

            const articleId = article.getAttribute('id');


            /* find the title element */

            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* get the title from the title element */

            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';


            /* create HTML of the link */

            titleList.innerHTML = titleList.innerHTML + linkHTML;

            /* insert link into html variable */

            html = html + linkHTML;

        }

        titleList.innerHTML = html;

        const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }

    };

    generateTitleLinks();

    function calculateTagClass(count, params) {

        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

        return optCloudClassPrefix + classNumber;

    }


    function generateTags() {


        /* [NEW] create a new variable allTags with an empty array */
        let allTags = {};

        /* find all articles */

        const articles = document.querySelectorAll(optArticleSelector);

        /* START LOOP: for every article: */

        for (let article of articles) {

            /* find tags wrapper */

            const tagsWrapper = article.querySelector(optArticleTagsSelector);



            /* make html variable with empty string */

            let html = '';

            /* get tags from data-tags attribute */

            const articleTags = article.getAttribute('data-tags');



            /* split tags into array */

            const articleTagsArray = articleTags.split(' ');

            /* START LOOP: for each tag */

            for (let tag of articleTagsArray) {

                /* generate HTML of the link */

                const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

                /* add generated code to html variable */

                html = html + linkHTML;

                /* [NEW] check if this link is NOT already in allTags */
                if (!allTags[tag]) {
                    /* [NEW] add generated code to allTags array */
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;
                }


                /* END LOOP: for each tag */
            }


            /* insert HTML of all the links into the tags wrapper */

            tagsWrapper.innerHTML = html;



            /* END LOOP: for every article: */
        }
        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector('.tags');

        const tagsParams = calculateTagsParams(allTags);
        console.log('tagsParams:', tagsParams)

        function calculateTagsParams(tags) {

            let params = {
                min: 999999,
                max: 0
            };

            for (let tag in tags) {
                params.max = Math.max(tags[tag], params.max);
                params.min = Math.min(tags[tag], params.min);
            }
            return params;
        }

        /* [NEW] create variable for all links HTML code */
        let allTagsHTML = ' ';

        /* [NEW] START LOOP: for each tag in allTags: */
        for (let tag in allTags) {
            /* [NEW] generate code of a link and add it to allTagsHTML */

            const tagLinkHTML = '<li><a class ="' + calculateTagClass(allTags[tag], tagsParams) + '"href="' + tag + '">' + tag + '</a></li>';

            //         const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParam) + '</li>';
            //         console.log('tagLinkHTML:', tagLinkHTML);

            allTagsHTML += tagLinkHTML;

            //  allTagsHTML += tag + ' (' + allTags[tag] + ') ';
        }
        /* [NEW] END LOOP: for each tag in allTags: */

        /*[NEW] add HTML from allTagsHTML to tagList */
        tagList.innerHTML = allTagsHTML;
    }

    generateTags();



    function tagClickHandler(event) {
        /* prevent default action for this event */
        event.preventDefault();
        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        /* find all tag links with class active */
        const tagActiveLinks = document.querySelectorAll('.tags a.active');
        /* START LOOP: for each active tag link */
        console.log(tagActiveLinks);

        for (let tagActiveLink of tagActiveLinks) {
            /* remove class active */
            tagActiveLink.classList.remove('active');

            /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
        /* START LOOP: for each found tag link */
        for (let tagLink of tagLinks) {
            /* add class active */
            tagLink.classList.add('active');
            /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '" ]');
    }

    generateTitleLinks();

    function addClickListenersToTags() {
        /* find all links to tags */
        const linksToTag = document.querySelectorAll('.post-tags .list a, .sidebar .tags a');
        /* START LOOP: for each link */
        for (let linkToTag of linksToTag) {
            /* add tagClickHandler as event listener for that link */
            linkToTag.addEventListener('click', tagClickHandler);
            /* END LOOP: for each link */
        }
    }

    addClickListenersToTags();


    function generateAuthors() {
        /* find all authors */

        const articles = document.querySelectorAll(optArticleSelector);

        const allAuthors = {};

        /* START LOOP: for every author: */

        for (let article of articles) {

            /* find author wrapper */

            const authorWrapper = article.querySelector(optArticleAuthorSelector);

            /* make html variable with empty string */

            let html = '';

            /* get authors from post-author attribute */

            const articleAuthors = article.getAttribute('data-author');


            /* generate HTML of the link */

            const linkHTML = '<a href="#author-' + articleAuthors + '">' + articleAuthors + '</a>';

            /* insert HTML of all the links into the authors wrapper */

            authorWrapper.innerHTML = linkHTML;

            if (!allAuthors[articleAuthors]) {
                /* [NEW] add generated code to allTags array */
                allAuthors[articleAuthors] = 1;
            } else {
                allAuthors[articleAuthors]++;
            }

        }

        let allAuthorsHTML = '';

        let authorList = document.querySelector('.list.authors');

        for (let authorName in allAuthors) {

            const authorLinkHTML = '<li><a ' + 'href="' + authorName + '">' + authorName + '  (' + allAuthors[authorName] + ')</a></li>';

            allAuthorsHTML += authorLinkHTML;

        }
        /* [NEW] END LOOP: for each tag in allTags: */

        authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();

function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "author" and extract tag from the "href" constant */
    const articleAuthor = href.replace('#author-', '');
    /* find all author links with class active */
    const authorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active author link */
    for (let authorActiveLink of authorActiveLinks) {
        /* remove class active */
        authorActiveLink.classList.remove('active');
        /* END LOOP: for each active author link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let authorLink of authorLinks) {
        /* add class active */
        authorLink.classList.add('active');
        /* END LOOP: for each found tag link */
    }
    /* execute function "generateAuthors" with article selector as argument */
    generateTitleLinks('[data-author="' + articleAuthor + '" ]');
}

function addClickListenersToAuthors() {
    /* find all links to tags */
    const linksToAuthors = document.querySelectorAll('a[href^="#author-"');
    /* START LOOP: for each link */
    for (let linkToAuthor of linksToAuthors) {
        /* add tagClickHandler as event listener for that link */
        linkToAuthor.addEventListener('click', authorClickHandler);
        /* END LOOP: for each link */
    }
}

addClickListenersToAuthors();
}