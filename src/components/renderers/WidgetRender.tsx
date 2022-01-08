import React, { ReactElement } from 'react';
import Moment from 'react-moment';
import { IWidget } from '../../interfaces/IWidget.';

export default function WidgetRender({
  title,
  isSpecialCard,
  description,
  rating,
  id,
  created,
  updated,
}: IWidget): ReactElement {
  return (
    <div className="col-12 p-3">
      <div className={isSpecialCard ? 'card specialCard' : 'card'}>
        <div className="card-body">
          <h1 className="card-title">{title}</h1>
          <p className="card-text">{description}</p>
          <p className="card-text font-italic">Rating: {rating}/10</p>
          <div className="card-footer text-muted text-right">
            <span className="float-left">#{id}</span> created:{' '}
            <Moment fromNow date={created} locale="Es-es" />
            updated: <Moment fromNow date={updated} locale="Es-es" />
          </div>
        </div>
      </div>
    </div>
  );
}
