import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Snapshotters',
    url: '/docs/category/snapshotters',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
    Learn more about the snapshotters and run your own!

      </>
    ),
  },
  {
    title: 'Core Powerloom Protocol',
    url: '/docs/category/protocol',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
       Learn more about the Core Powerloom Protocol!

      </>
    ),
  },
  {
    title: 'Build on Powerloom',
    url: '/docs/category/build-with-powerloom',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
       Learn about how to get started with powerloom
      </>
    ),
  },
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
