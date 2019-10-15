import React, { Component } from 'react';
import { MyConsumer } from '../Context'
import '../styles/content.css'
import '../styles/Menu.css'
import { directive } from '@babel/types';

class Menu extends Component {
  render() {
    return (
      <MyConsumer>
        {({ }) => (
          <div class="menu">
            <ul class="sm-block-grid-4">
              {
                [1, 2, 4, 5, 6].map((number) =>
                  <li key={number.toString()}>
                    <div class="item">
                      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571175888721&di=44779d1102c43a9c149afd271c6ecef1&imgtype=0&src=http%3A%2F%2Fp1.meituan.net%2Fdeal%2F8ffd64e8bf1de127d3622d21d78d7fc9171026.jpg" />
                      <div class="title">beijinhg duck</div>
                    </div>
                  </li>
                )
              }
            </ul>
          </div>
        )}
      </MyConsumer>
    );
  }
}

export default Menu;