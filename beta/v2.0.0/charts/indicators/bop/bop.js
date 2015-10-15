define(["jquery","jquery-ui","color-picker","loadCSS"],function(a){function b(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function c(c,d){loadCSS("charts/indicators/bop/bop.css");var e=[];a.get("charts/indicators/bop/bop.html",function(f){var g="#cd0a0a";f=a(f),f.appendTo("body"),f.find("input[type='button']").button(),f.find("#bop_stroke").colorpicker({part:{map:{size:128},bar:{size:128}},select:function(b,c){a("#bop_stroke").css({background:"#"+c.formatted}).val(""),g="#"+c.formatted},ok:function(b,c){a("#bop_stroke").css({background:"#"+c.formatted}).val(""),g="#"+c.formatted}});var h=f.find("#bop_levels").DataTable({paging:!1,scrollY:100,autoWidth:!0,searching:!1,info:!1});a.each(e,function(b,c){a(h.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,c.dashStyle]).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})}),f.find("#bop_level_delete").click(function(){h.rows(".selected").indexes().length<=0?require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Select levels to delete!"})}):h.rows(".selected").remove().draw()}),f.find("#bop_level_add").click(function(){require(["charts/indicators/bop/bop_level"],function(b){b.open(c,function(b){a.each(b,function(b,c){a(h.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,c.dashStyle]).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})})})})}),f.dialog({autoOpen:!1,resizable:!1,width:350,modal:!0,my:"center",at:"center",of:window,buttons:[{text:"Ok",click:function(){require(["validation/validation"],function(){require(["charts/indicators/highcharts_custom/bop"],function(b){b.init();var c=[];a.each(h.rows().nodes(),function(){var b=a(this).data("level");b&&c.push({color:b.stroke,dashStyle:b.dashStyle,width:b.strokeWidth,value:b.level,label:{text:b.level}})});var d={stroke:g,strokeWidth:parseInt(f.find("#bop_strokeWidth").val()),dashStyle:f.find("#bop_dashStyle").val(),levels:c};a(a(".bop").data("refererChartID")).highcharts().series[0].addBOP(d)}),b.call(f)})}},{text:"Cancel",click:function(){b.call(this)}}]}),"function"==typeof d&&d(c)})}return{open:function(b){return 0==a(".bop").length?void c(b,this.open):void a(".bop").data("refererChartID",b).dialog("open")}}});