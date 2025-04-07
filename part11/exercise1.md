# Java Project

## Outline: 
There are 6 people working on an application written in Java. The app is in active development and will be deployed soon. Below i discuss:
- The spicific tools used in a java project for
  - Linting
  - Testing
  - Building
- Any alternatives for CI setup than Jenkins and Github Actions
- Whether this setup would be better self-hosted or in a cloud environment

### Java tools for CI:
For linting, the most prominent for java seems to be Checkstyle. Another option seems to be to use the intelliJ IDE for ensuring code checks. For testing, Maven seems to be a popular option. Docker is pervasive as a package builder, and seems to be used no matter what language you choose. Packages an application, along with its dependencies, into a package which can be executed across different environments. 

There exists many alternatives to Jenkins or Github actions, the two most common systems used for manual, and cloud based CI. Some examples include Northflank, a cloud based deployment solution, Harness, a cloud deployment platform that utilises AI to enhance the deployment cycle and provide AI-native analytics. Bitbucket Pipelines provides direct integration with bitbucket repositories. 

Overall, i think that a team of this size would benefit from a cloud-based CI/CD system, with many cost-effective and scalable options for small to medium size projects, and convenient setup.