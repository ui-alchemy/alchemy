## Alchemy

This is the base component that all Alchemy components will rely on at a minimum.
The functionality provided is a base set of shared directives and common SCSS variables.


### How to Release

For now, the release process for an Alchemy component requires a few manual steps.
First, build a new release version and commit to master.  The build process will: 

* run JSHint
* compile SCSS
* concatenate Javascript
* copy the JS, SCSS, CSS into dist/

To build:

    grunt build
    git status
    git commit -a

Now, we want to push the build directory into a release branch.  If you already have a release branch, clean-it-up with:

    git branch -D release

Create the release branch as a subtree of the dist/ directory:

    git subtree split --prefix dist --branch release

Now checkout the release branch:

    git checkout release

You should see everything that was in the dist/ directory laid out in a flat file structure. 
The last step is to version bump, tag and push out.  In the example below, we are updating the version to 0.0.2.

    vim component.json # adjust the version field => "version": "0.0.2"
    git commit -a -m 'Version bump'
    git tag 0.0.2
    git push alchemy release --force && git push alchemy --tags
