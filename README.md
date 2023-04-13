# projectTech

## RaveMatch

Do you feel like no one likes the music you like? Do you find yourself at parties bored because you don't like the music? Would you like to find like-minded people? Then use RaveMatch!

RaveMatch is a dynamic application where you can find like-minded people by browsing other peoples profiles. You can describe yourself on your own profile and you are able to follow the people you like. This way you'll always be able to follow what they're doing and to which parties they're going.

## RaveMatch Features

* Browsing all user profiles on the explore page
* Following people you like
* Easily finding all the people you follow in your following page

## How can you run this application?

1. Clone this repository

    Cloning links

        HTTPS: https://github.com/JarnoVoogd/projectTech.git

        SSH: git@github.com:JarnoVoogd/projectTech.git

2. Open your terminal and find the file

3. Once you're within the file, install Node Package Manager (NPM)

    Run this command in your terminal
        
        npm install -g npm

4. Go to the [MongoDB](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_emea-nl_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624536&adgroup=115749708903&cq_cmp=12212624536&gclid=CjwKCAjw0N6hBhAUEiwAXab-TRkfRk2rvl6mCkgVQPtrOQTN1o77SIap81uQmOiBHwokhYn8_7_LIBoCYE4QAvD_BwE) website and create a database

5. Insert users according to the data structure given on the  [Database structure](https://github.com/JarnoVoogd/projectTech/wiki/database) page.

6. Change the `.env` file keys to your own

    The following keys have to be edited

        DB_USERNAME=''
        DB_PASSWORD=''
        DB_URI=''
        DB_NAME=''
        COLLECTION_ADMIN_NAME=''
        COLLECTION_PROFILES_NAME=''
        COLLECTION_GENERAL_NAME=''

7. Run the application

    Run command

        npm run devStart