import React, { Component } from 'react'
import moment from 'moment'
import { Card, Row, Col, Badge, Modal, Spin, Icon } from 'antd'
import { Link } from 'react-router-dom'
import 'moment/locale/zh-cn'

const site = 'http://movie.52react.cn/'
const Meta = Card.Meta
const DPlayer = window.DPlayer

moment.locale('zh-cn')

export default class Content extends Component {
  state = { visible: false }

  // 关闭视频
  _handleClose = e => {
    if (this.player && this.player.pause) {
      this.player.pause()
    }
  }
  //  退出
  _handleCancel = e => {
    this.setState({
      visible: false
    })
  }

  _jumpToDetail = () => {
    const { url } = this.props
    // url不为空则执行
    url && window.open(url)
  }
  // 显示视频
  _showModal = movie => {
    this.setState({
      visible: true
    })

    const video = site + movie.videoKey
    const pic = site + movie.coverKey
    // 增加延时是因为弹窗没有渲染到dom结构中
    if (!this.player) {
      setTimeout(() => {
        this.player = new DPlayer({
          container: document.getElementsByClassName('videoModal')[0],
          screenshot: true,
          autoplay: true,
          video: {
            url: video,
            pic: pic,
            thumbnails: pic
          }
        })
      }, 500)
    } else {
      // 是否是同一个视频
      if (this.player.video.currentSrc !== video) {
        this.player.switchVideo({
          url: video,
          autoplay: true,
          pic: pic,
          type: 'auto'
        })
      }

      this.player.play()
    }
  }

  _renderContent = () => {
    const { movies } = this.props

    return (
      <div style={{ padding: '30px' }}>
        <Row>
          {movies.map((it, i) => (
            <Col key={i} xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} style={{ marginBottom: '8px' }}>
              <Card
                bordered={false}
                hoverable
                style={{ width: '100%' }}
                actions={[
                  <Badge>
                    <Icon style={{ marginRight: '2px' }} type="clock-circle" />
                    {moment(it.meta.createdAt)
                      .startOf('day')
                      .fromNow()}{' '}
                    前更新
                  </Badge>,
                  <Badge>
                    <Icon style={{ marginRight: '2px' }} type="star" />
                    {it.rate} 分
                  </Badge>
                ]}
                cover={<img onClick={() => this._showModal(it)} src={site + it.posterKey + '?imageMogr2/thumbnail/x1680/crop/1080x1600'} />}
              >
                <Meta
                  style={{ height: '202px', overflow: 'hidden' }}
                  title={<Link to={`/detail/${it._id}`}>{it.title}</Link>}
                  onClick={this._jumpToDetail}
                  description={<Link to={`/detail/${it._id}`}>{it.summary}</Link>}
                />
              </Card>
            </Col>
          ))}
        </Row>
        <Modal className="videoModal" footer={null} visible={this.state.visible} afterClose={this._handleClose} onCancel={this._handleCancel}>
          <Spin size="large" />
        </Modal>
      </div>
    )
  }

  render() {
    return <div style={{ padding: 10 }}>{this._renderContent()}</div>
  }
}
