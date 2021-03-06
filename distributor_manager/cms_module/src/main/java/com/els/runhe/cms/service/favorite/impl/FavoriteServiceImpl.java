package com.els.runhe.cms.service.favorite.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.els.runhe.cms.dao.article.ArticleMapper;
import com.els.runhe.cms.dao.favorite.FavoriteMapper;
import com.els.runhe.cms.entity.favorite.Favorite;
import com.els.runhe.cms.entity.favorite.FavoriteExample;
import com.els.runhe.cms.service.favorite.FavoriteService;
import com.els.base.core.entity.ResponseResult;
import com.els.base.core.exception.CommonException;
import com.els.base.core.entity.PageView;

/**
 * FavoriteServiceImpl
 * 
 * @author acer
 * 
 */
@Service
public class FavoriteServiceImpl implements FavoriteService {

	@Autowired
	protected FavoriteMapper favoriteMapper;

	@Autowired
	protected ArticleMapper articleMapper;

	@Override
	public void addObj(Favorite favorite) {
		favoriteMapper.insertSelective(favorite);

	}

	@Override
	public void deleteObjById(Integer favoriteId) {
		favoriteMapper.deleteByPrimaryKey(favoriteId);

	}

	@Override
	public void modifyObj(Favorite favorite) {
		favoriteMapper.updateByPrimaryKeySelective(favorite);

	}

	@Override
	public List<Favorite> queryAllObjByExample(FavoriteExample favoriteExample) {
		return favoriteMapper.selectByExample(favoriteExample);
	}

	@Override
	public Favorite queryObjById(Integer favoriteId) {
		return favoriteMapper.selectByPrimaryKey(favoriteId);
	}

	@Override
	public PageView<Favorite> queryObjByPage(FavoriteExample example) {
		PageView<Favorite> pageView = example.getPageView();
		if (pageView == null) {
			pageView = new PageView<Favorite>();
			pageView.setPageNo(1);
			pageView.setPageSize(10);
			example.setPageView(pageView);
		}
		List<Favorite> list = this.favoriteMapper
				.selectByExampleByPage(example);
		pageView.setQueryResult(list);
		return pageView;
	}

	/**
	 * 点赞、取消赞、点衰、取消衰
	 * 
	 * @param map
	 */
	@Transactional
	public ResponseResult<String> likeOrDislike(Integer type, Integer status,
			String memberId, Integer articleId, Integer storeId) {
//		String code = "00";
//		String msg = "ok";
		Map<String, Object> map = buildMap(type, status, memberId, articleId);
		Favorite favorite = buildFavorite(type, status, memberId, articleId,
				storeId);

		FavoriteExample example = new FavoriteExample();
		example.createCriteria().andMemberIdEqualTo(memberId)
				.andArticleIdEqualTo(articleId).andTypeEqualTo(type);
		List<Favorite> list = favoriteMapper.selectByExample(example);
		if (CollectionUtils.isNotEmpty(list)) {// 判断t_cms_favorite
												// 表中是否有记录，有则修改，没有则添加
			if (list.get(0).getStatus().equals(status)) {
				throw new CommonException("不能重复操作。");
			} else {
				favorite.setId(list.get(0).getId());
				favoriteMapper.updateByPrimaryKeySelective(favorite);
				articleMapper.updateCount(map);
			}
		} else {
			articleMapper.updateCount(map);
			favoriteMapper.insertSelective(favorite);
		}
		return ResponseResult.success();
	}

	/**
	 * 构建Favorite对象
	 * 
	 * @param type
	 * @param status
	 * @param memberId
	 * @param articleId
	 * @return
	 */
	public Favorite buildFavorite(int type, int status, String memberId,
			int articleId, int storeId) {
		Favorite favorite = new Favorite();
		favorite.setArticleId(articleId);
		favorite.setMemberId(memberId);
		favorite.setType(type);
		favorite.setStatus(status);
		favorite.setStoreId(storeId);
		return favorite;
	}

	/**
	 * 构建map对象
	 * 
	 * @param type
	 * @param status
	 * @param memberId
	 * @param articleId
	 * @return
	 */
	public Map<String, Object> buildMap(int type, int status, String memberId,
			int articleId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("articleId", articleId);
		if (1 == type) {// type 0:赞 1:衰
			if (1 == status) {// status 0:有效 1:无效
				map.put("dislikeCount", -1);
			} else {
				map.put("dislikeCount", 1);
			}

		} else {
			if (1 == status) {// status 0:有效 1:无效
				map.put("likeCount", -1);
			} else {
				map.put("likeCount", 1);
			}
		}
		return map;
	}
}
