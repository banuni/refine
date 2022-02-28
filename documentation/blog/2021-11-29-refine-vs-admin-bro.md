---
title: Refine vs AdminBro - Comparison Admin Panel Framework
description: Refine vs AdminBro
slug: refine-vs-adminbro
authors: melih
tags: [refine, admin-bro, react, admin-panel, react-framework]
image: https://refine.dev/img/refine_social.png
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import refine_flow from '@site/static/img/blog/2021-11-29-refine-vs-adminbro/refine_flow.png';
import project_setup from '@site/static/img/blog/2021-11-29-refine-vs-adminbro/project_setup.gif';

Looking for open source **admin panel framework**? Here we are going to review two of the best **Open Source admin panel frameworks of 2021**.


<!--truncate-->

These frameworks that we will talk about have emerged to offer solutions to the same business demands in general. Although the purpose of these two frameworks is the same, the solutions are different from each other. Our goal in this article is to show you these differences and help you find the appropriate framework for your project.

:::note
This comparison table strives to be as accurate and as unbiased as possible. If you use any of these libraries and feel the information could be improved, feel free to suggest changes (with notes or evidence of claims) contact info@refine.dev or you can open a issue on [Github](https://github.com/pankod/refine).
:::


## Refine
**refine** is a React-based framework that helps you to develop admin panel, B2B and dashboard that can be fully customized with Ant Design.

**refine** directly provides Ant Design components and some hooks to work with those components. These hooks give you the required props for those Ant Design components.

**refine** is a collection of helper hooks, components and providers. They are all decoupled from your UI components and business logic, so they never keep you from customizing your UI or coding your own flow.

**refine** uses [React Query](https://react-query.tanstack.com/) for data processing, caching, and state management. In this respect, you do not need to define anything extra for every cases and model.

Although **refine** is a newer framework, it is successful in identifying deficiencies in development and producing solutions accordingly. Using new technologies, it offers users more effective and simpler development options.

### Installation
* Installation is very simple and customizable options can be added.

```bash
npx superplate-cli demo-refine-project
```

<img src={project_setup} alt="setup" />

### Features

* Configuration: One-line setup with superplate. Project setup is very simple. Using superplate you can choose the content of your project and the features you want to add. 

* UI: You have full control over the UI elements. Fully customizable, open to use. Works seamlessly with Ant Design System.

* Out-of-the-box: Routing, networking, authentication, state managment, i18n and UI.

* Next.js / SSR integration: **refine** can be used with Next.js to SSR your pages.

* React Location: React Location router provider support 

### SSR - Next.js Support 
refine has support for SSR - Next.js. This is an important feature that separates **refine** from other frameworks. Thanks to this feature, **refine** provides the opportunity to develop B2C applications in addition to B2B and admin panel.

refine can be used with Next.js to SSR your pages. It doesn't get in the way and follows Next.js conventions and also provides helper modules when necessary.

#### SSR-Next.js Setup

```bash
npm i @pankod/refine @pankod/refine-nextjs-router
```

#### SSR-Next.js Basic Usage
`<Refine>` must wrap your pages in a custom App component. This way your pages are integrated to refine.

```tsx title=pages/_app.tsx
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
        >
            <Component {...pageProps} />
        </Refine>
    );
}

export default MyApp;
```
[For more information on how to add SSR-Next.js to your Refine project ->](https://refine.dev/docs/guides-and-concepts/ssr-nextjs/) 

### Routing
**refine** uses a customized Router Provider to save routes and navigate between pages. **refine** offers a much more flexible structure thanks to its routerProvider support.

A router provider must include the following methods:

```tsx
const routerProvider = {
    useHistory: () => {
        push: (...args) => any,
        replace: (...args) => any,
        goBack: (...args) => any,
    },
    useLocation: () => {
        pathname: string,
        search: string,
    },
    useParams: <Params extends { [K in keyof Params]?: string } = {}>() => Params,
    Prompt: React.FC<PromptProps*>,
    Link: React.FC<any>,
    RouterComponent?: React.FC<any>,
};
```

:::info
refine includes many  router providers to use in your projects like: 

* React Router
* React Location
* Next.js Router
:::

[To take a look at how other router providers are defined and working](https://refine.dev/docs/api-references/providers/router-provider/)

To activate router provider in **refine**, we have to pass the routerProvider to the `<Refine />` component.

<Tabs
defaultValue="react-router"
values={[
{label: 'React Router', value: 'react-router'},
{label: 'React Location', value: 'react-location'},
{label: 'Next.js Router', value: 'nextjs'}
]}>
<TabItem value="react-router">

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";

const App: React.FC = () => {
    return <Refine routerProvider={routerProvider} />;
};
```

</TabItem>
<TabItem value="react-location">

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-location";

const App: React.FC = () => {
    return <Refine routerProvider={routerProvider} />;
};
```

</TabItem>
<TabItem value="nextjs">

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-nextjs-router";

const App: React.FC = () => {
    return <Refine routerProvider={routerProvider} />;
};
```

  </TabItem>
</Tabs>

You just need to tell the route of your component to the routerProvider.


### Data Provider Logic

A data provider is the place where a **refine** app communicates with an API.

<img src={refine_flow} alt="refine" />


A data provider must include following methods:

```ts
const dataProvider = {
    create: ({ resource, variables, metaData }) => Promise,
    createMany: ({ resource, variables, metaData }) => Promise,
    deleteOne: ({ resource, id, metaData }) => Promise,
    deleteMany: ({ resource, ids, metaData }) => Promise,
    getList: ({ resource, pagination, sort, filters, metaData }) => Promise,
    getMany: ({ resource, ids, metaData }) => Promise,
    getOne: ({ resource, id, metaData }) => Promise,
    update: ({ resource, id, variables, metaData }) => Promise,
    updateMany: ({ resource, ids, variables, metaData }) => Promise,
    custom: ({
        url,
        method,
        sort,
        filters,
        payload,
        query,
        headers,
        metaData,
    }) => Promise,
    getApiUrl: () => "",
};
```


:::note
Data hooks uses React Query to manage data fetching. React Query handles important concerns like caching, invalidation, loading states etc..
:::

#### GraphQL Data Provider
It is well covered by GraphQL data provider **refine** and explained step by step in the documentation.

**refine** GraphQL data provider is built with [qql-query-builder](https://github.com/atulmy/gql-query-builder) and [graphql-request](https://github.com/prisma-labs/graphql-request). The purpose here is to send dynamic queries that we can do with qql-query-builder as requests with graphql-request. 

Query builder helps us build queries and mutations. We can use these queries with the getList, getMany and getOne methods in our data provider. On the other hand, the create, createMany, update, updateMany, deleteOne and deleteMany methods generate a mutation to send a request.

In order to create a query, we need to specify the fields that we will use from our data provider. Thanks to the MetaDataQuery, we pass these fields to our data provider and start using them.

#### Basic GraphQL Usage

```tsx src/App.tsx
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-strapi-graphql";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("API_URL");

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(client)}
        />
    );
};
```

When sending the request, we must specify which fields will come, so we send fields in `metaData` to hooks that we will fetch data from.

<Tabs
defaultValue="usage"
values={[
{label: 'usage', value: 'usage'},
{label: 'output', value: 'output'},
]}>

<TabItem value="usage">

```tsx
export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
        // highlight-start
        metaData: {
            fields: [
                "id",
                "title",
                {
                    category: ["title"],
                },
            ],
        },
        // highlight-end
    });

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
         // highlight-start
        metaData: {
            fields: ["id", "title"],
        },
         // highlight-end
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    sorter={{ multiple: 2 }}
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                    sorter={{ multiple: 1 }}
                />
                <Table.Column<IPost>
                    dataIndex="category"
                    title="Category"
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...selectProps}
                            />
                        </FilterDropdown>
                    )}
                    render={(_, record) => record.category.title}
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
```
</TabItem>

<TabItem value="output">

```tsx
query ($sort: String, $where: JSON, $start: Int, $limit: Int) {
    posts (sort: $sort, where: $where, start: $start, limit: $limit) {
        id,
        title,
        category {
            title
        }
    }
}
```
</TabItem>
</Tabs>

Here we only make requests for queries that are necessary. As you can see, all you have to do is specify the field you want to select with `metaData`.

[Refer to the GraphQL for detailed usage. → ](https://refine.dev/docs/guides-and-concepts/data-provider/graphql/)



### Refine Avaible Providers
Connects to any REST or GraphQL custom backend.

* NestJs CRUD: [https://github.com/pankod/refine/tree/master/examples/dataProvider/nestjsxCrud](https://github.com/pankod/refine/tree/master/examples/dataProvider/nestjsxCrud)
* Airtable: [https://github.com/pankod/refine/tree/master/examples/dataProvider/airtable](https://github.com/pankod/refine/tree/master/examples/dataProvider/airtable)
* Strapi: [https://github.com/pankod/refine/tree/master/examples/dataProvider/strapi](https://github.com/pankod/refine/tree/master/examples/dataProvider/strapi)
* Strapi v4: [https://github.com/pankod/refine/tree/master/examples/dataProvider/strapi-v4](https://github.com/pankod/refine/tree/master/examples/dataProvider/strapi-v4)
* Strapi GraphQL: [https://github.com/pankod/refine/tree/master/examples/dataProvider/strapi-graphql](https://github.com/pankod/refine/tree/master/examples/dataProvider/strapi-graphql)
* Supabase: [https://github.com/pankod/refine/tree/master/examples/dataProvider/supabase](https://github.com/pankod/refine/tree/master/examples/dataProvider/supabase)
* Hasura: [https://github.com/pankod/refine/tree/master/examples/dataProvider/hasura](https://github.com/pankod/refine/tree/master/examples/dataProvider/hasura)
* Nhost: [https://github.com/pankod/refine/tree/master/examples/dataProvider/nhost](https://github.com/pankod/refine/tree/master/examples/dataProvider/nhost)
* Appwrite: [https://github.com/pankod/refine/tree/master/examples/dataProvider/appwrite](https://github.com/pankod/refine/tree/master/examples/dataProvider/appwrite)
* Altogic: [https://github.com/pankod/refine/tree/master/examples/dataProvider/altogic](https://github.com/pankod/refine/tree/master/examples/dataProvider/altogic)

### Customization
* **refine's** motivation and main purpose are as follows: "Higher-level frontend frameworks can save you a lot time, but they typically offer you a trade-off between speed and flexibility." 
* While the admin panel allows you to make dashboard, B2B and B2C applications quickly, we offer you flexibility in your UI or business model.

#### UI/UX Customization: 
* **refine**, comes ready-made decoupled from the UI, and is used. **refine** mostly touches UI components via hooks. The main advantage of this for you is that you can successfully perform any Business request or different case.
#### Logic Customization:
* **refine**, works flawless with react-query. You don't have to worry about state management in your business model or when you encounter a different situation.

### Pricing
All features of **refine** are available as **open source**.

* Access Control Provider (RBAC, ABAC, ACL, IP, LDAP, etc...)
* Realtime
* Search 
* Navigation and more features are available

If you want to get information about the Enterprise, refine ready to help you for Support and Training.
[For more info about Enterprise->](https://refine.dev/enterprise/) 

**refine** Docs & Demo: [Documentation](https://refine.dev/docs/) - [Live Demo](https://refine.dev/demo/)

## AdminBro
[AdminBro](https://adminbro.com/index.html) is an open-source package from  that adds an auto-generated admin panel to your Node.js application. You provide database models or schemas and AdminBro generates the user interface for you. 

You can connect your various databases to the admin interface and perform standard CRUD operations  on the records. In this way, it makes it to make changes on your data and provides you with a great deal of convenience.

You can quickly develop and customize the Admin panel with AdminBro.

It provides you with solutions and provides convenience when making admin panel and b2b applications. It is an open source project that has been in development and ongoing development for a long time. 

### Installation

We can say that it is difficult to install, but it is clearly explained step by step in the documentation.

:::note
Since AdminBro uses your existing framework to render its routes - you have to use one of our plugins.

There are plugins for:
* Express
* Hapi
* Koa.js
* Nest.js
:::note

Install the AdminBro along with the express plugin

```bash
npm install admin-bro @admin-bro/express
```

Then, we need to install some dependencies express and the express-formidable packages. express-formidable is a peer dependency for AdminBro

 ```bash
 npm install express express-formidable
 ```

[For detailed installation →](https://adminbro.com/tutorial-installation-instructions.html)

### Features 

* You can use any data from any source and make changes to the data(create, read, update, delete)
* Custom actions
* Custom resource decorators
* Form validation 
* A full-featured control panel can be created.
* Internationalization(i18n)

### SSR - Next.js Support​
AdminBro does not support SSR-Next.js. It only helps you develop B2B and admin panel applications.

### Routing
Adminbro's routing processes are slightly different than others. You can also define the routes of the components that you have created custom here.

```jsx
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')

const express = require('express')
const app = express()

const adminBro = new AdminBro({
  databases: [],
  rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBro)
```
The concept of routing is handled in a different way and in general all routing operations are defined through this file.


### Data Provider Logic
It does not have a data provider exactly like other frameworks. It has a different structure. It has created functions for you to control your data. But there are rules that we must follow and do.

AdminBro can be connected to many different types of resources. Right now, they support the following options:

* Mongoose
* Sequelize
* TypeORM

To add resources , you first have to intall an adapter for the resource you want to use.

#### Install the Database Adapter and add resources

Let's take a look at an example made with the mongoose adapter.

```bash
npm install mongoose @admin-bro/mongoose
```

```tsx title="index.js"
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
 
const express = require('express')
const app = express()
 
const mongoose = require('mongoose')
 
AdminBro.registerAdapter(AdminBroMongoose)
 
const run = async () => {
  const connection = await mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true, useUnifiedTopology: true})
 
  const User = mongoose.model('User', { name: String, email: String, surname: String })
 
  const adminBro = new AdminBro ({
    Databases: [connection],
    rootPath: '/admin',
    resources: [User]
  })
  const router = AdminBroExpress.buildRouter(adminBro)
  app.use(adminBro.options.rootPath, router)
     
  app.listen(3000, ()=> {
    console.log('Application is up and running under localhost:3000/admin')
  })
}
run()
```
Here we first installed and connected mongoose. We then created a model and passed it to the AdminBro resource. AdminBro has built an interface for us where we can list our users. You can also add your own [custom adapters](https://adminbro.com/tutorial-writing-custom-adapters.html) and set up [custom resources](https://adminbro.com/tutorial-customizing-resources.html).

The logic is well covered and also well explained in the documentation. But we can say that it is complex compared to other frameworks. It can be difficult to use on big data. 
#### GraphQL Data Provider
There is no native GraphQL support. It can be supported with 3rd party packages.

[https://www.npmjs.com/package/admin-bro-graphql](https://www.npmjs.com/package/admin-bro-graphql)
[https://github.com/SoftwareBrothers/adminjs/issues/655](https://github.com/SoftwareBrothers/adminjs/issues/655)


### Customization
AdminBro is good at customizing. You can connect your own adapters and customize your resources. These customizations are challenging and complex.

Some customizable features are as follows:
 * [Customize Resources](https://adminbro.com/tutorial-customizing-resources.html)
 * [Customize Actions](https://adminbro.com/tutorial-actions.html)
 * [Custom Validations](https://adminbro.com/tutorial-actions-validations.html)
 * [Customize dashboard](https://adminbro.com/tutorial-custom-dashboard.html)

#### UI/UX Customization:​
It automatically offers you an interface option that you can use. You can also develop and customize your own components. You can do your own styling and write your own custom components, but for this customization, you need to follow and apply a few steps. It doesn't speed you up in UI development.

[For more information about developing your own components ->](https://adminbro.com/tutorial-writing-react-components.html)

### Pricing
All features of Adminbro are open source and accessible.

* Role-Based Access Control
* Content Management System

AdminBro Docs & Demo: [Documentation](https://adminbro.com/tutorial-installation-instructions.html) - [Live Demo](https://admin-bro-example-app-staging.herokuapp.com/admin/login)

## Conclusion
We have examined these two frameworks under some headings. Both help you successfully develop admin panel and B2B applications.

We suggest asking some questions to find out which one is more suitable for your project.

At this point, the questions you should ask when choosing these of framework may be as follows:

* How flexible are they in offering solutions to the different business demands we may encounter?

* How difficult will it be to implement the providers and features we will be using?

* If any problem arises, can I easily find a solution from the documentation?

* How dependent am I on this framework when using it in my project and does it offer customization possibilities?

* What does it offer me as an extra feature?

Here **refine** directly answers some of your questions. **refine**'s customized structures (API, Router, i18n, GraphQL provider, etc...) provide you convenience from many points, unlike admin bro. This convenience and perspective provided by **refine** can be preferred for many projects. In addition, you can be limited to internal tool/B2B applications with AdminBro.  You can develop many different projects with **refine**'s rich UI library and SSR support.

In this article, we tried to answer these questions. By reading this article, you can choose the appropriate framework for your project and use it.
