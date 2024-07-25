## Introduction

This report explores various techniques for anonymizing data such as Names, Emails, Tax numbers, Bank accounts, Phone numbers, Addresses(zip code, street, apt#, cities, countries)(s3)

Anonymization Techniques

- Data Masking: Ideal for most data types as it maintains the format.
- Tokenization: Best for sensitive financial data.
- Data Shuffling: Suitable for phone numbers and addresses, maintains format but can disrupt patterns.
- Generalization: Effective for location data, reduces data precision.
- Pseudonymization: Good balance of utility and privacy for identifiers.
- Data Perturbation: Useful for numerical data, adds noise to protect privacy.

## Data Masking
- Description: Replaces real data with structurally similar but fake data.
- Suitable for: Names, emails, tax numbers, bank accounts, phone numbers, addresses, cities, and countries.
- Example:
- Original: Yujun Liu
- Masked: Intnr Oer
- Pros: Maintains data format and can be easily reversed.
- Cons: If not done properly, masked data can be reverted back to the original.

## Tokenization
- Description: Replaces sensitive data with unique identification symbols (tokens) that retain essential information without compromising security.
-	Suitable for: Bank accounts, credit card numbers, and social security numbers.
-	Example:
- Original: 1234-5678-9012-3456
-	Tokenized: token-token-token-token
-	Pros: High security as tokens are meaningless without the original data.
-	Cons: Requires a secure token vault.

## Data Shuffling
- Description: Randomly reorders data within a dataset.
-	Suitable for: Phone numbers, addresses, and cities.
-	Example:
-	Original: (123) 456-7890
-	Shuffled: (789) 456-1230
-	Pros: Data format remains intact.
-	Cons: Can introduce statistical inconsistencies.

## Generalization
-	Description: Reduces the precision of data to make it less identifiable.
-	Suitable for: Addresses, cities, and dates of birth.
-	Example:
-	Original: 22 bond St, Watertown, MA
-	Generalized: Watertown, MA
-	Pros: Maintains data utility for analysis.
-	Cons: Less effective for small datasets.

## Pseudonymization
-	Description: Replaces private identifiers with fake identifiers or pseudonyms.
-	Suitable for: Names and emails.
-	Example:
-	Original: yujunliu150@gmail.com
-	Pseudonymized: user1234@anonymized.com
-	Pros: Balances data utility and privacy.
-	Cons: Pseudonyms can be re-identified if linked with external data.
    
## Data Perturbation
-	Description: Adds random noise to data to mask original values.
-	Suitable for: Numerical data such as bank balances and salaries.
-	Example:
-	Original: $1,000
-	Perturbed: $1,015
-	Pros: Effective for protecting numerical data.
-	Cons: Can distort data analysis results.

Each techniques could be implemented in specific field.

Therefore, suggested usages with Flexbench anonymizer could be

- Names 
  - data masking with start simbol *  
  - data masking with fake names(or random shuffling the original name)
  - tokenize last name and mask it
- Emails 
  - data masking with 'Anonymized Email'
  - Pseudonymization with @address.com
  - 
- Tax numbers
  - data masking with zeros
  - tokenize regex and replace
- Bank accounts
  - data shuffling
  - data masking
  - Data Perturbation (randomly change one or two numbers in the sequence)
- Phone numbers
  - data shuffling
  - tokenize area number and mask with '(000)'
- Addresses(zip code, street, apt#, cities, countries)
  - generalization
