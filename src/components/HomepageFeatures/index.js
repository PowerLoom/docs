import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Build with Powerloom',
    url: '/docs/category/build-with-powerloom',
    Svg: require('@site/static/img/build-with-powerloom.svg').default,
    description: (
      <>
        Learn how to utilize Powerloom Protocol for building your own Decentralized Finance (DeFi) applications.
      </>
    ),
  },
  {
    title: 'Snapshotter Nodes',
    url: '/docs/category/snapshotter-node',
    Svg: require('@site/static/img/snapshotter-node.svg').default,
    description: (
      <>
        Dive into Snapshotter Nodes. Learn about its architecture, variations, and setting up your own.
      </>
    ),
  },
  {
    title: 'Protocol Core',
    url: '/docs/category/protocol-overview',
    Svg: require('@site/static/img/core-protocol.svg').default,
    description: (
      <>
        Learn about the Powerloom Protocol specifications, Data Markets, Snapshot Composition, and more.
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
