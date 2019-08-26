/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-09 16:11:19
 * @LastEditTime: 2019-08-22 17:18:38
 * @LastEditors: Please set LastEditors
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Switch,Router, Route } from 'dva/router'
import dynamic from 'dva/dynamic'

const Routers = function ({ history, app }) {
  const route = [
    {
      models: [
        'error',
        'example',
        'global',
      ],
      component: () => import('./App'),
    }
  ]
  const routes = route.map((v)=>{
    let obj = Object.assign({},v);
    if(v.models && v.models.length !== 0){
      const models = v.models.map((val)=>{
        return import("./models/"+val)
      });
      obj.models = () => models;
    }
    return obj;
  })
  return (
     <Router history={history}>
        <Switch>
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
        </Switch>
      </Router>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers;
