import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Build with Powerloom',
    url: '/docs/category/build-with-powerloom',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Learn how to build on Powerloom and integrate it into your application
      </>
    ),
  },
  {
    title: 'Snapshotter Node',
    url: '/docs/category/snapshotter-node',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Learn more about the snapshotter nodes and how to run your own!
      </>
    ),
  },
  {
    title: 'Core Powerloom Protocol',
    url: '/docs/category/protocol-overview',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Deep dive into the core protocol design of Powerloom
      </>
    ),
  }
];

function Feature({Svg, title, description, url}) {
  return (
    <div className={clsx('col col--4')}>
            <Link to={url} className={clsx('text--center', styles.featureBox, styles.linkDefaultColor)} style={{ textDecoration: 'none' }}>

      <div className={clsx('text--center')}>
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
