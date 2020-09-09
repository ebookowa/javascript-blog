'use strict';

{
    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');


        /* [DONE] remove class 'active' from all article links  */

        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */

        console.log('clickedElement:', clickedElement);

        clickedElement.classList.add('active');

        /* [DONE] remove class 'active' from all articles */

        const activeArticles = document.querySelectorAll('.posts .post.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */

        const articleSelector = clickedElement.getAttribute('href');

        console.log(articleSelector);

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */

        const targetArticle = document.querySelector(articleSelector);

        console.log(targetArticle);

        /* [DONE] add class 'active' to the correct article */

        targetArticle.classList.add('active');
    };

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list';

    function generateTitleLinks() {

        /* remove contents of titleList */

        const titleList = document.querySelector(optTitleListSelector);

        titleList.innerHTML = '';

        console.log(titleList);

        /* find all the articles and save them to variable: articles */

        const articles = document.querySelectorAll(optArticleSelector);

        let html = '';

        for (let article of articles) {

            /* get the article id */

            const articleId = article.getAttribute('id');

            console.log(articleId);

            /* find the title element */

            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* get the title from the title element */

            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

            console.log(linkHTML);

            /* create HTML of the link */

            titleList.innerHTML = titleList.innerHTML + linkHTML;

            /* insert link into html variable */

            html = html + linkHTML;

            console.log(html);
        }

        titleList.innerHTML = html;

        const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }

    };

    generateTitleLinks();



    function generateTags() {
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

            console.log(articleTags);


            /* split tags into array */

            const articleTagsArray = articleTags.split(' ');

            /* START LOOP: for each tag */

            for (let tag of articleTagsArray) {

                /* generate HTML of the link */

                const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

                /* add generated code to html variable */

                html = html + linkHTML;



                /* END LOOP: for each tag */

            }

            /* insert HTML of all the links into the tags wrapper */

            tagsWrapper.innerHTML = html;

        }

        /* END LOOP: for every article: */
    }

    generateTags();



function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAtribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
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
    generateTitleLinks('[data-tag~="' + tag + '" ]');
}



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

}