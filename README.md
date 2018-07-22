# Silverstripe Template

This will provide you with all of the neccesary file and folders to install silverstripe along with custom configuration for development and a few extra starting page classes and templates


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Prerequisites

* Git
* Composer
* Npm

### Installing
### Step 1

Create folder for your new project and name it accordingly

### Step 2

Open a terminal and clone the repo to the folder (don't forget the dot on the end)


```
$ git clone git@github.com:ByronMorley/silverstripe_master_template.git .
```

### Step 3
Setup your database details in the following file:
````
mysite/config.php
````
or use ss_environment.php to configure your database.#
### Step 4

In your root folder, run:
````
$ composer update
````

### Step 5

Navigate to themes/base/ and run:
````
$ npm update
````

#### Step 6

Remove and re-intialise the git file if you wish to use git to manage your project.

## Authors

* **Byron Morley**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


