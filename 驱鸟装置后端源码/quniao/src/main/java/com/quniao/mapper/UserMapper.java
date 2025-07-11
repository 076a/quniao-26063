package com.quniao.mapper;


import com.quniao.pojo.entity.User;
import com.quniao.pojo.vo.UserInfoVo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    @Select("select * from user where username=#{username}")
    User getByUsername(String username);

    @Insert("insert into user(username, password, role, field_id, create_time,age,phone,email) values(#{username},#{password},#{role},#{fieldId},#{createTime},#{age},#{phone},#{email})")
    void insert(User user);

    @Select("select * from user where id=#{id}")
    User getInfoByID(Integer id);


    void update(User user);

    @Select("select role.name from user,role where user.id=#{id} and user.role=role.id")
    String getRole(Integer id);

    @Select("select user.id, user.username,role.name as role_name,user.field_id,user.phone,user.email,user.age,user.create_time,field.name as field_name from user,role,field where user.id=#{id} and user.role=role.id and user.field_id=field.id")
    UserInfoVo getTotalInfoById(Integer id);
}
