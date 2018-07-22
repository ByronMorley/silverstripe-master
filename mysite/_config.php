<?php

global $project;
$project = 'mysite';

/**************************
 *       DATABASE
 *************************/

global $database;
$database = 'poet';

require_once("conf/ConfigureFromEnv.php");

/**************************
 *       LOCALE
 *************************/

i18n::set_locale('en_GB');
Translatable::set_default_locale('en_GB');
Translatable::set_allowed_locales(array(
		'cy_GB',  //Welsh
		'en_GB',
	)
);

/**************************
 *     ERROR HANDLING
 *************************/

FulltextSearchable::enable(array('SiteTree'));

SS_Log::add_writer(new SS_LogFileWriter(dirname(__FILE__) . '/errors.log'), SS_Log::ERR);
SS_Log::add_writer(new SS_LogFileWriter(dirname(__FILE__) . '/notice.log'), SS_Log::NOTICE);
Config::inst()->update('Email', 'send_all_emails_from', 'byron@atebol.com');

if (Director::isLive()) {
	$encryption = 'tls';
	$charset = 'UTF-8';
	$mailer = new SmtpMailer('smtp.office365.com', 'byron@atebol.com', '', 'tls', 'UTF-8', 587, 4);
	Injector::inst()->registerService($mailer, 'Mailer');
}

if (Director::isDev()) {
	// Turn on all errors
	ini_set('display_errors', 1);
	ini_set("log_errors", 1);
	//error_reporting(E_ERROR | E_PARSE);
	//error_reporting(E_ALL && ~E_DEPRECATED);
	error_reporting(E_ALL | E_STRICT);
	Email::set_mailer(new Kinglozzer\SilverStripeMailgunner\Mailer);
}
define('SITE_DIR', basename(dirname(__FILE__)));

$config = HtmlEditorConfig::get('cms');

$config->enablePlugins(array(
	'ss_insert_codeblock' => '../../../code-blocks/javascript/tinymce-codeblock/editor_plugin.js'
));
$config->addButtonsToLine(2, 'ss_insert_codeblock');

ShortcodeParser::get('default')->register('codeblock', array('CodeBlock', 'codeblock_shortcode_handler'));