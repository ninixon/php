<?php
namespace Deployer;

require 'recipe/laravel.php';

// Project name
set('application', 'blog');

// Project repository
set('repository', 'https://github.com/php1108/blog.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true); 

// Shared files/dirs between deploys 
add('shared_files', []);
add('shared_dirs', []);

// Writable dirs by web server 
add('writable_dirs', []);


//server
server('ailiyun','php128.top')
    ->user('root')
    ->password('beautifulG07123')
    ->set('deploy_path', '~/{{application}}');    
    
// Tasks

task('build', function () {
    run('cd {{release_path}} && build');
});

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Migrate database before symlink new release.

before('deploy:symlink', 'artisan:migrate');

