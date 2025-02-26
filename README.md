### Steps to create web app

1. Design schemas
2. Create Models
3. Implement API CRUD operations
    3.1 Create User/Author
        3.1.1 One can register either author or User
        3.1.2 Once the user assigned a role, he cant register for other role with same e-mail

    3.2 Post new Article by Author
        3.2.1 Use timestamp as articleId
        3.2.2 Take current date for dareOfCreation & for dateOfModification for an article
    
    3.3 Edit article by Author using author ID
    
    3.4 Delete/Restore article by AUthor using author ID
        3.4.1 Change isArticleActive state to false/true to delete & restore an article

    3.5 User can read all articles 
        3.5.1 Sort list of articles by date of creation (By student)
        3.5.2 Search for an article by category (By student)

    3.6 User can write comments for articles