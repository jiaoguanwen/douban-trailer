import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './routes'
import 'antd/dist/antd.css'
import './assets/common.sass'

/**
 * 引入所以路由
 * 路由路径  exact 模板  遍历所有路由
 */
export default () => (
  <Switch>
    {routes.map(({ name, path, exact = true, component }) => (
      <Route path={path} exact={exact} component={component} key={name} />
    ))}
  </Switch>
)
