public with sharing class RelatedContactsController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountsWithNoRelatedContacts(){
        try {
            List<Account>accounts=new List<Account>();
            accounts=[SELECT Id, Name FROM Account LIMIT 10];
            System.debug(accounts);
            return accounts;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getRelatedContacts(Id accountId){
        try {
            List<Contact>contacts=new List<Contact>();
            contacts=[SELECT Id, Name, Phone, Email, AccountId FROM Contact WHERE AccountId= :accountId];
            System.debug(contacts);
            return contacts;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}