import { Icon } from '../../lib/main';
import styles from './styles.module.css';
import { IconName, IconNames, IconProps } from '../../lib/atoms/Icon';

export const IconTest = () => {
  const renderRow = (iconName: IconName, props?: Omit<IconProps, 'name'>) => {
    return (
      <div className={styles.row} key={iconName}>
        {<Icon {...props} name={iconName} />}
        <p className={styles.label}>{iconName}</p>
      </div>
    );
  };

  const iconsToTest: { iconName: IconName; props?: Omit<IconProps, 'name'> }[] =
    [
      // Test all icons with no props
      ...IconNames.map((iconName) => ({ iconName })),

      // // Test some additional props
      { iconName: 'ic_arrowback', props: { stroke: 'red' } },
      {
        iconName: 'ic_return',
        props: { stroke: 'red', size: 48 },
      },
      {
        iconName: 'ic_pending',
        props: { fill: 'green', stroke: 'gray', size: 48 },
      },
      {
        iconName: 'ic_show',
        props: { stroke: 'red', size: 48 },
      },
      {
        iconName: 'ic_gift',
        props: { style: { width: 120, height: 120, marginTop: 50 } },
      },
    ];

  return (
    <div className={styles.column}>
      <h1>Icons!</h1>
      {iconsToTest.map(({ iconName, props }) => renderRow(iconName, props))}
    </div>
  );
};
