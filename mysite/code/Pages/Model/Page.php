<?php

class Page extends SiteTree
{

	public static $allowed_actions = array();

	private static $db = array();

	private static $has_one = array();

	private static $has_many = array(
	);

	public function getCMSFields()
	{
		$fields = parent::getCMSFields();

		$fields->removeByName('Content');

		return $fields;
	}

	private function findThemeClass($ID)
	{
		if ($ID > 0) {
			$Page = Page::get()->filter('ID', $ID)->first();

			if ($Page->ParentID == 0) return;
			if ($Page->ClassName == "Theme") {
				return $Page->ColorScheme;
			} else {
				return $this->findThemeClass($Page->ParentID);
			}
		}
	}

	public function pageClass()
	{
		return $this->findThemeClass($this->ID);
	}
}
