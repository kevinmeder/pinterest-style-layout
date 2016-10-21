$(function(){
    
    var windowWidth = 0,
        columnCount,
        containerWidth,
        columns = [],
        isActive = false,
        startPhase = true;

    // adjust width of columns and gutters
    var columnWidth = 400,
        gutter = 30;

    $(window).load(resize);
    $(window).resize(resize);

    function resize(phase){

        // set column and gutter css
        if(startPhase === true){
            $("ul.pins").css({ "min-width": columnWidth + "px" });
            $("ul.pins li").css({ "width": (columnWidth-gutter) + "px", "padding": "0px " + (gutter/2) + "px" });
            startPhase = false;
        }

        // sets layout based on column count
        if(windowWidth !== $(window).width()){
            windowWidth = $(window).width();
            columnCount = Math.floor(windowWidth/columnWidth);
            columnCount = (columnCount === 0) ? 1 : columnCount ;    
            containerWidth = columnCount*columnWidth;
            $("ul.pins").css({"width": containerWidth + "px"});
            
            // clear column array for window resize
            columns = [];

            for(var i = 0; i < columnCount; i++){
                columns[i] = 0; 
            }

            $("ul.pins li").each(function(){
                var pinHeight = $(this).height();
                var minColumnHeight = Math.min.apply(Math,columns);
                var minColumnKey = $.inArray( minColumnHeight, columns );

                $(this).css({"top": minColumnHeight + "px", "left": (columnWidth*minColumnKey) + "px"});

                columns[minColumnKey] = minColumnHeight + pinHeight + gutter;
            });

            $("ul.pins").css({ "height": Math.max.apply(Math, columns) + "px" });

        }

        // check for completion of initial load to set css transitions for pins
        if(isActive === false){
            $("ul.pins li").addClass("active");
            setTimeout(function(){
                $("ul.pins li").addClass("trans");
            }, 300);
            isActive = true;
        }

    }
    
});
