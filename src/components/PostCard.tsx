import {
  CalendarOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Tag } from 'antd';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';

import type { Post } from '../api/types';
import { PRIMARY_COLOR } from '../constant';

const PostCard = ({ post }: { post: Post }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const fullTextFlag = params.get('f') === 'true';
  return (
    <Card
      title={<div dangerouslySetInnerHTML={{ __html: post.title }} />}
      className="w-full"
      extra={<a href={post.link}>查看原文</a>}
    >
      <div className="space-y-3">
        <div>
          {post.author && (
            <Tag icon={<UserOutlined />} color={PRIMARY_COLOR}>
              {post.author.slice(1)}
            </Tag>
          )}
          <Tag icon={<CalendarOutlined />} color={PRIMARY_COLOR}>
            {dayjs.unix(Number(post.date)).format('YYYY/MM/DD HH:mm:ss')}
          </Tag>
          <Tag icon={<EditOutlined />} color={PRIMARY_COLOR}>
            约 {post.content_length} 字
          </Tag>
        </div>
        <div
          className="break-words"
          dangerouslySetInnerHTML={{
            __html: fullTextFlag
              ? post.content.replace(/\n{3,}/g, '\n\n').replace(/\n/g, '<br>')
              : post.content,
          }}
        ></div>
        {post.tags && (
          <div className="flex flex-wrap gap-1">
            {post.tags
              .slice(1)
              .split(' #')
              .map((tag, index) => (
                <Tag key={index}>
                  {<div dangerouslySetInnerHTML={{ __html: '#' + tag }} />}
                </Tag>
              ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PostCard;
