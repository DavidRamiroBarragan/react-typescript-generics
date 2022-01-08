import React, { ReactElement } from 'react';
import Moment from 'react-moment';
import IPerson from '../../interfaces/IPerson';

export default function PersonRender({
  firstName,
  lastName,
  eyeColor,
  birthday,
}: IPerson): ReactElement {
  return (
    <div className="col-12 p-3">
      <div className={'card'}>
        <div className="card-body">
          <h3>
            {firstName} {lastName} 😊
          </h3>
          <ul>
            <li>
              Has <b>{eyeColor}</b> eyes
            </li>
            <li>
              <b>🎂&nbsp;Birthday:</b>{' '}
              <Moment date={birthday} format="D MMMM YYYY" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
