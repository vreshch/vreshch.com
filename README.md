# Personal CV Website: [vreshch.com](http://vreshch.com)

[![GitHub Build Status](https://github.com/vreshch/vreshch.com/workflows/CI/badge.svg)](https://github.com/vreshch/vreshch.com/actions?query=workflow%3ACI)
[![License: MIT](https://img.shields.io/badge/License-MIT-gren.svg)](https://opensource.org/licenses/MIT)

Personal Website vreshch.com, contains CV, interests, Contacts;

## Technologies Used

* Rect & Typescript
* Next JS as Framework
* Shipped with Docker
* Terraform for Infrastructure

## Docker commands

* Build Docker file locally

```bash
docker build -t europe-west3-docker.pkg.dev/vreshch-com-320817/vreshch/vreshch-com:latest .
```

* Start Docker file

```bash
docker run --network=host europe-west3-docker.pkg.dev/vreshch-com-320817/vreshch/vreshch-com:latest
```

* Push docker to registry

```bash
docker login & docker push europe-west3-docker.pkg.dev/vreshch-com-320817/vreshch/vreshch-com:latest


## Creating infrastructure

* Install gcloud according to [instructions](https://cloud.google.com/sdk/docs/install)
* Auth with gcloud sdk

```bash
gcloud auth application-default login
```

* Create Google Cloud project (use your own PROJECT_ID & PROJECT_NAME)

```bash
gcloud projects create "PROJECT_ID" --name="PROJECT_NAME"
```

* Modify environment variables

```bash
code terraform.tfvars
```

* Verify your domain
https://developers.google.com/search

* Initialize terraform

```bash
    sterraform init
```

* Plan Terraform changes

```bash
    terraform plan
```

* Deploy Terraform changes

```bash
    terraform apply
```

## Contacts

* [Website](http://vreshch.com)
* [LinkedIn](https://www.linkedin.com/in/vreshch/)
* [GitHub](https://github.com/vreshch)
* [Email](vreshch@gmail.com)
