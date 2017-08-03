package org.lsmy.cloud.common.sql.model;

import java.util.ArrayList;
import java.util.List;

import org.lsmy.cloud.common.sql.model.base.SQLBaseModel;
import org.lsmy.cloud.common.sql.vo.FieldVO;

public class {{U(data.table)}}SQLModel extends SQLBaseModel {

  	/**
  	 * @Description 获取扩展字段
  	 * @return
  	 * @lastModifier
  	 */
  	@Override
  	protected List<FieldVO> getExtFields(){
        List<FieldVO> fields = new ArrayList<FieldVO>();

        return fields;
  	}

  	/**
  	 * @Description 是否忽略该字段
  	 * @param vo
  	 * @return
  	 * @lastModifier
  	 */
  	@Override
  	protected boolean ignore(FieldVO vo){
        switch(vo.getField()){
        {{each data.fields}}
        //{{$value.Comment}}
        case "{{$value.Field}}":
          break;
        {{/each}}
        }
  		  return false;
  	}

  	/**
  	 * @Description 重新定义说明
  	 * @param vo
  	 * @lastModifier
  	 */
  	@Override
  	protected void comment(FieldVO vo){
  		  switch(vo.getField()){
        {{each data.fields}}
        //{{$value.Comment}}
        case "{{$value.Field}}":
        vo.setComment(vo.getComment());
        break;
        {{/each}}
  		}
  	}

  	/**
  	 * @Description 获取基础字段
  	 * @return
  	 * @lastModifier
  	 */
  	@Override
  	protected List<FieldVO> getBaseFields() {
  		  return {{U(data.table)}}SQLField.fields;
  	}

}
