//========================
// Strict Syntax Rendering
//========================
"use strict";

//===============
// Initialization
//===============
$(function() {
	$("#casestartdate").datepicker();
	$("#birthdate").datepicker();

	//initialize slick slider
	$(".patient-details-mobile-slider").slick();

  //calculate age
	function getAge(patientBirthday) {
		var dateToday = new Date();
		var month = dateToday.getMonth()+1, year = dateToday.getFullYear();
		var dateBirthday = new Date(patientBirthday);
		var monthBirth = dateBirthday.getMonth()+1, yearBirth = dateBirthday.getFullYear();

		if((month - monthBirth) < 0) {
			month = month + 12;
			year = year - 1;
		}

		return (year - yearBirth) + "y, " + (month - monthBirth) + "m";
	}

	//update patient details content
	function updatePatientDetails() {
		$(".patient-details-mobile .patient-photo").attr("src",$(".patient-details-full .patient-photo").attr("src"));
		$(".patient-details-mobile .patient-name").html($("#patientname").val());
		$(".patient-details-mobile .patient-genderandage .gender").html("(" + $("#gender").find(":selected").text() + ")");
		$(".patient-details-mobile .patient-status .value").html($("#status").find(":selected").text());
		$(".patient-details-mobile .patient-casetype .value").html($("#casetype").find(":selected").text());
		$(".patient-details-mobile .patient-casestartdate .value").html($("#casestartdate").val());
		$(".patient-details-mobile .patient-genderandage .age").html(getAge($("#birthdate").val()));
		//console.log(getAge($("#birthdate").val()));
	}
	$("#patientname, #gender, #status, #casestartdate, #birthdate, #casetype").change(function(){
		updatePatientDetails();  
	});
	updatePatientDetails();

	//lightbox
	lightbox.option({
		"resizeDuration": 250,
		"fadeDuration": 250
	});
	
	//notes on mobile
	$(".notes-mobile a").click(function() {
    //reset class
		$("#notes-modal .modal-body").attr("class","modal-body");

    //copy content on notes to modal windows for mobile view
		if($(this).attr("show-data") == "notes-orthodontist") $("#notes-modal .modal-body").html($(".notes .notes-orthodontist").html()).addClass("notes-orthodontist");
		else if ($(this).attr("show-data") == "notes-yours") $("#notes-modal .modal-body").html($(".notes .notes-yours").html()).addClass("notes-yours");
    
    //append 'mobile' on all classes
		$("#notes-modal .notes-content + div").attr("id",$("#notes-modal .notes-content + div").attr("id") + "-mobile");
		$("#notes-modal .card").each(function(index) {
			$(this).find(".card-header a").attr("href",$(this).find(".card-header a").attr("href") + "-mobile");
			$(this).find(".collapse").attr("id",$(this).find(".collapse").attr("id") + "-mobile").attr("data-parent",$(this).find(".collapse").attr("data-parent") + "-mobile");
		});
	});

});
