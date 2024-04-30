package com.ezen.test.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ezen.test.domain.BoardDTO;
import com.ezen.test.domain.BoardVO;
import com.ezen.test.domain.PagingVO;

@Mapper
public interface BoardDAO {

	int insert(BoardVO boardVO);

	List<BoardVO> getList(PagingVO pgvo);

	BoardVO getDetail(int bno);

	int update(BoardVO bvo);

	void remove(int bno);

	void updateRead_count(int bno);

	int getTotal(PagingVO pgvo);

	int selectBno();

	void add_cmt_qty(int bno);

	void delete_cmt_qty(int bno);

	void update_has_file(BoardVO bvo);


}