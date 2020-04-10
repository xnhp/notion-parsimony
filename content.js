// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Modify_a_web_page

Zepto(function($) {

    // hide header of list db view on middle click

    // the container div has classes: notion-selectable notion-collection_view-block
    // strategy: on middle click anywhere in table, bubble up to find container div,
    // then find table header and toggle it

    // hide all table headers on init
    // having the old problem that contents are loaded dynamically
    setTimeout(function(){
        $('.notion-collection_view-block').forEach(function(item, index, array) {
            // only do this on parent container elements
            if (
                $(item).has('.notion-collection_view-block').length > 0
            ) {
                $(item).children('div').eq(0).hide();
            }
        });
        },
        3000 // assume this is enough time
    );

    $('.notion-collection_view-block').on('auxclick', function(e) {
        console.log(e.button);
        // only on shift+middle mouse click
        if (e.button != 1 || !e.shiftKey) return;

        // note that in the hierarchy, there are two .notion-collection_view-block

        // prevent event from bubbling upwards and triggering on the second such div
        e.stopPropagation();
        // dont want to "open in new tab"
        e.preventDefault();

        tableHeader = $(e.target).eq(0)
            .closest('.notion-collection_view-block')
            .parent('*') // else `closest` returns the element itself
            .closest('.notion-collection_view-block')
            .children('div').eq(0);

        console.log($(tableHeader).css('display'));

        if ( isVisible(tableHeader) ) {
            hideHeader(tableHeader);
        } else {
            showHeader(tableHeader);
        }
    });

    function showHeader(header) {
        $(header).css('display', 'block');
    }
    function hideHeader(header) {
        $(header).css('display', 'none');
    }
    function isVisible(elem) {
        return $(elem).css('display') != 'none';
    }

});
