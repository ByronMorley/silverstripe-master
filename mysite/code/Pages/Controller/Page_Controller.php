<?php

class Page_Controller extends ContentController
{

	private static $allowed_actions = array(
		'markup',
	);

	public function init()
	{
		parent::init();

		/*  -- Stylesheets --*/
		Requirements::css('twitter/bootstrap/dist/css/bootstrap.min.css');
		Requirements::css('components/font-awesome/css/font-awesome.min.css');
		Requirements::css($this->ThemeDir() .'/css/style.min.css');


		/*  -- Javascript --*/
		Requirements::javascript('components/jquery/jquery.min.js');
		Requirements::javascript('twitter/bootstrap/dist/js/bootstrap.min.js');

		Requirements::javascript($this->ThemeDir() . '/js/main.min.js');
		//Requirements::javascript($this->ThemeDir() . '/app/dist/bundle.js');
		//Requirements::javascript('http://localhost:35729/livereload.js');
	}

	public function index()
	{
		if (Director::is_ajax()) {
			return $this->renderWith("Ajax/" . $this->ClassName);
		} else {
			return $this->render();
		}
	}
}
