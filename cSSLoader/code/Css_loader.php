<?php

class Css_loader extends DataExtension
{

	public static $allowed_actions = array();

	private static $db = array();

	private static $has_one = array();

	private static $has_many = array();

	public function contentControllerInit()
	{
		/*
		Requirements::css(SALAD_SLIDER_DIR . '/css/style.min.css');
		Requirements::javascript(SALAD_SLIDER_DIR . '/js/main.js');
		*/
	}
}